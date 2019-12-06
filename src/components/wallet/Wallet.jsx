import React, { useState, Fragment } from 'react'
import cn from 'classnames'
import { isEqual, get } from 'lodash-es'
import { navigate } from 'gatsby'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { useMutation } from '@apollo/react-hooks'
import { WITHDRAW } from '../../lib/backend-queries'

import QRCode from './QRCode'
import { prettyPrintAmount } from '../../lib/helpers'

export default ({ wallet, userBalance, postSlug }) => {
  const [withdraw] = useMutation(WITHDRAW)

  const [clipBoardNotification, showClipBoardNotification] = useState(false)

  const isWithdraw = isEqual(wallet, userBalance)

  const availableBalance = userBalance.unlockedBalance - userBalance.locked

  const initialValues = isWithdraw ? { amount: '', to: '' } : { amount: 10 }

  const historyPath = postSlug
    ? `/user/article/wallet/history/${postSlug}`
    : '/user/main/wallet'

  const addressOnClickEvent = () => {
    navigator.clipboard.writeText(wallet.address)
    showClipBoardNotification(true)
  }

  const manual = isWithdraw ? (
    <Fragment>
      Use the <strong>QR</strong> code or the <strong>TRTL</strong> address above, to{' '}
      <strong>deposit</strong> funds into this wallet.
    </Fragment>
  ) : (
    <Fragment>
      To support the author, you can <strong>deposit TRTL</strong> directly to this address.
    </Fragment>
  )

  return (
    <div className="wallet">
      <div className="wallet_wrapper">
        <div className="qr">
          <QRCode text={wallet.address} width={200} height={200} />
        </div>
        <div className="info form">
          {clipBoardNotification && <div className="error">TRTL address copied to clipboard.</div>}
          <div className="address" onClick={addressOnClickEvent}>
            {wallet.address}
          </div>
          <div>{manual}</div>
          {userBalance.address ? (
            <div className="withdraw">
              <div className="balance">
                <strong>Available Balance:</strong> {prettyPrintAmount(availableBalance)}
              </div>
              <div className="balance">
                <strong>Locked Balance:</strong> {prettyPrintAmount(userBalance.lockedBalance)}
              </div>

              <Formik
                initialValues={initialValues}
                validate={values => {
                  const errors = {}

                  if (availableBalance === 0) {
                    errors.amount = 'Your balance is empty'
                  }
                  if (!values.amount) {
                    errors.amount = 'Required'
                  }

                  if (isWithdraw) {
                    if (!values.to) {
                      errors.to = 'Required'
                    }
                    if (values.to.length !== 99) {
                      errors.to = 'Address length should be 99 characters'
                    }
                  }

                  if (values.amount > availableBalance / 100 - 0.1) {
                    errors.amount = `Max value is ${prettyPrintAmount(availableBalance - 10)}`
                  }

                  return errors
                }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  setSubmitting(true)
                  const to = values.to ? values.to : wallet.address

                  const request = { to, amount: values.amount * 100 }

                  if (wallet.articleSlug && isWithdraw) request.from = wallet.articleSlug

                  let response
                  try {
                    response = await withdraw({ variables: request })
                  } catch (error) {
                    setStatus(error.toString())
                  }

                  const status = get(response, 'data.withdraw.status', null)

                  if (status) setStatus(status)
                }}
              >
                {({ isSubmitting, errors, status, touched }) => (
                  <Form className="form">
                    <div>{isSubmitting}</div>
                    <div className={cn('status', { error: status })}>{status}</div>
                    <ul>
                      {isWithdraw && (
                        <li>
                          <ErrorMessage className="error" name="to" component="div" />
                          <Field
                            className={cn('field-style field-full align-none', {
                              error: errors.to && touched.to
                            })}
                            type="text"
                            name="to"
                            placeholder="Withdraw address"
                            autoComplete="off"
                          />
                        </li>
                      )}
                      <li>
                        <ErrorMessage className="error" name="amount" component="div" />
                        <Field
                          className={cn('field-style field-split align-none', {
                            error: errors.amount && touched.amount
                          })}
                          type="number"
                          name="amount"
                          placeholder="Amount"
                          autoComplete="off"
                        />
                      </li>
                    </ul>
                    <div>
                      <button className="btn small" type="submit" disabled={isSubmitting}>
                        <div className="button__content">{isWithdraw ? 'Withdraw' : 'Donate'}</div>
                      </button>
                      <button
                        onClick={() => navigate(historyPath)}
                        className="btn small"
                        type="button"
                      >
                        <div className="button__content">History</div>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div style={{ margin: '10px 0' }}>
              <div style={{ marginBottom: '10px' }}>
                Please <strong>Sign in</strong> to donate from your personal account.
              </div>
              <button className="btn small" type="button" onClick={() => navigate('/auth/signin')}>
                <div className="button__content">Sign in</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

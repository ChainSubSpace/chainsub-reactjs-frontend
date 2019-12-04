import React, { useState } from 'react'
import cn from 'classnames'
import {navigate} from 'gatsby'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import {useMutation} from '@apollo/react-hooks'
import {WITHDRAW} from '../../lib/backend-queries'

import QRCode from './QRCode'
import { prettyPrintAmount } from '../../lib/helpers'

export default ({ wallet, userBalance }) => {
  const [clipBoardNotification, showClipBoardNotification] = useState(false)

  const addressOnClickEvent = () => {
    navigator.clipboard.writeText(wallet.address)
    showClipBoardNotification(true)
  }

  const [withdraw] = useMutation(WITHDRAW)

  const availableBalance = userBalance.unlockedBalance - userBalance.locked

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
          <div>To support the author, you can deposit TRTL directly to this address.</div>
          {userBalance.address ? (
            <div className="withdraw">
              <div className="balance">
                <strong>Available Balance:</strong> {prettyPrintAmount(availableBalance)}

              </div>
              <div className="balance">
                <strong>Locked Balance:</strong> {prettyPrintAmount(userBalance.lockedBalance)}
            </div>

              <Formik
                initialValues={{ amount: 10 }}

                validate={values => {
                  const errors = {}


                  if (availableBalance === 0) {errors.amount = 'Your balance is empty'}
                  if (!values.amount) {
                    errors.amount = 'Required'
                  }

                  if (values.amount > (availableBalance / 100 - 0.1)) {
                    errors.amount = `Max value is ${prettyPrintAmount((availableBalance - 10))}`
                  }

                  return errors
                }}
                onSubmit={async (values, { setSubmitting , setStatus }) => {
                  setSubmitting(true)

                  const request = {to: wallet.address, amount: values.amount * 100}

                  try {
                    await withdraw({ variables: request })
                  } catch (error) {
                    setStatus('Identifier or password invalid.')
                  }

                }}
              >
                {({ isSubmitting, errors, status, touched }) => (
                  <Form className="form">
                    <div>{isSubmitting}</div>
                    <div className={cn('status', { error: status })}>{status}</div>
                    <ul>
                      <li>
                        <ErrorMessage className="error" name="amount" component="div" />
                        <Field
                          className={cn('field-style field-full align-none', {
                            error: errors.amount && touched.amount
                          })}
                          type="number"
                          name="amount"
                          // min="1"
                          // max="15"
                          placeholder="Amount to donate"
                          autoComplete="off"
                        />
                      </li>
                    </ul>
                    <div>
                      <button className="btn small" type="submit" disabled={isSubmitting}>
                        <div className="button__content">Donate</div>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ): (
            <div style={{margin:'10px 0'}}>
              <div style={{marginBottom:'10px'}}>Please <strong>Sign in</strong> to donate from your personal account.</div>
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

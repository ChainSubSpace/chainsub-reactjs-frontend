import React from 'react'

import { formatDate, prettyPrintAmount } from '../../lib/helpers'

export default ({ transaction }) => (
  <div className="post_info">
    <div className="post_info__meta">
      <div>
        <strong>Block Height:</strong> {transaction.blockHeight}
      </div>
      <div className="hash">
        <strong>Hash:</strong>{' '}
        <a
          target="_blank"
          href={`https://blocks.turtlenode.net/?hash=${transaction.hash}#blockchain_transaction`}
        >
          {transaction.hash}
        </a>
      </div>
      <div>
        <strong>Total:</strong> {prettyPrintAmount(transaction.amount)}
      </div>
      <div>
        <strong>Fee:</strong> {prettyPrintAmount(transaction.fee)}
      </div>
      <div>
        <strong>Received:</strong> {formatDate(transaction.createdAt)}
      </div>
    </div>
  </div>
)

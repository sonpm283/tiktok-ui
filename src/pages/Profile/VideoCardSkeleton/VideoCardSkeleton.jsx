import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function VideoCardSkeleton() {
  return (
    <section>
      <ul className="list">
        {Array(5)
          .fill()
          .map((item, index) => (
            <li className="card" key={index}>
              <Skeleton height={290} />
            </li>
          ))}
      </ul>
    </section>
  )
}

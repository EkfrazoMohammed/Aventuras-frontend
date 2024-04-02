import React, { useEffect } from "react";
import "./CancelationPolicy.scss";

const CancelationPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="cancelation-policy-page-container">
      <div className="cancelation-policy-page-wrapper">
        <div className="cancelation-policy-text-container">
          <div className="heading">Cancellation Policy</div>
          <div className="para-container">
            <div className="sections">
              <div className="subheading">PAYMENTS:</div>

              <div className="para">
                For all the services contracted, certain advance payment should
                be made to hold the booking, on confirmed basis & the balance
                amount can be paid upon arrival at origin point of the trip but
                definitely before the commencement of the services. Management
                personnel hold the right to decide upon the amount to be paid as
                advance payment, based on the nature of the service & the time
                left for the commencement of the service.
              </div>

              <div className="cancel-bold-text">
                Apart from above in some cases like Special Train Journeys,
                hotels or resorts bookings during the peak season (X-Mas, New
                Year, Festivals etc.), full payment is required to be sent in
                advance.
              </div>

              <div className="subheading">CANCELLATION POLICY:</div>

              <div className="para">
                In the event of cancellation of tour / travel services due to
                any avoidable / unavoidable reason/s we must be notified of the
                same in writing.
              </div>
              <div className="para">
                Cancellation charges will be effective from the date we receive
                advice in writing, and cancellation charges would be as follows:
              </div>

              <div className="list-container">
                <ul className="list-wrapper">
                  <li className="list-items">
                    <span className="bold-text">60 days prior to arrival:</span>
                    10% of the Tour / service cost
                  </li>
                  <li className="list-items">
                    <span className="bold-text">45 days prior to arrival:</span>
                    20% of the Tour / service cost
                  </li>

                  <li className="list-items">
                    <span className="bold-text">15 days prior to arrival:</span>
                    25% of the Tour / service cost
                  </li>

                  <li className="list-items">
                    <span className="bold-text">07 days prior to arrival:</span>
                    50% of the Tour / service cost
                  </li>
                </ul>
              </div>

              <div className="subheading">
                LESS THAN 72 HOURS OR NO SHOW: NO REFUND
              </div>

              <div className="para cancel-bold-text">
                In case of Special Trains Journeys and peak season hotel
                bookings a separate cancellation policy is applicable (which can
                be advised as and when required).
              </div>

              <div className="subheading">
                SOME CANCELLATION AND REFUND POLICIES ARE OUT OF OUR TENDER:
              </div>

              <div className="list-container">
                <ul className="list-wrapper">
                  <li className="list-items">
                    Refund for hotel payment will follow the hotel’s
                    cancellation policy
                  </li>
                  <li className="list-items">
                    Refund for transfer or sightseeing tour of any sort will
                    follow the on ground vendor’s cancellation policy
                  </li>

                  <li className="list-items">
                    Train tickets cancellations will follow the Railway’s policy
                  </li>

                  <li className="list-items">
                    Flight tickets cancellations will follow the airlines
                    company policy
                  </li>
                  <li className="list-items">
                    In case you cancel the trip after commencement, refund would
                    be restricted to a limited amount only which too would
                    depend on the amount that we would be able to recover from
                    the hoteliers/ contractors we patronize.
                  </li>

                  <li className="list-items">
                    For unused hotel accommodation, chartered transportation &
                    missed meals etc. we do not bear any responsibility to
                    refund.
                  </li>
                </ul>
              </div>

              <div className="subheading">OUR LIABILITIES & LIMITATIONS:</div>

              <div className="para">
                Please note that after the finalization of the Tour/ service
                Cost, if there are any Hike in entrance fees of monuments /
                museums, Taxes, fuel cost or guide charges – by Govt of India,
                the same would be charged as extra.
              </div>

              <div className="subheading">LAW & JURISDICTION</div>

              <div className="para">
                For all complaints, suits, claims or disputes of whatsoever
                nature relating to any products offered by Aventuras Holidays
                LLP, will be under the exclusive jurisdiction of Court of
                Jamshedpur, Jharkhand.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelationPolicy;

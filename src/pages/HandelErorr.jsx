import ErrorBtn from "../components/errorBtn";

export default function HandelErorr() {
  return (
    <main className="pb-3">
    <h2 className="text-center">للاسف حدث خطا</h2>
    <h5 className="text-center mt-md-4">يرجي العودة في وقت اخر او التواصل مع فريق الدعم</h5>
    <div className="d-flex justify-content-center">
      <img src="/images/error-Service-Unavailable.png" className="w-25" alt="" />
    </div>
    <ErrorBtn />
  </main>

  )
}

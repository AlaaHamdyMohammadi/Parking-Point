import ErrorBtn from "../components/errorBtn";

export default function NotFound() {
  return (
    <main>
      <h2 className="text-center">الصفحة غير موجودة</h2>
      <div className="d-flex justify-content-center">
        <img src="/images/404-error.png" className="w-25" alt="" />
      </div>
      <ErrorBtn />
    </main>
  )
}

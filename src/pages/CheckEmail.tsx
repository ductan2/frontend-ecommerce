
const CheckEmail = () => {
   return (
      <div className="d-flex " style={{ height: "80vh", alignItems: "center", flexDirection: "column", justifyContent: "center", width: "70vw", margin: "auto" }}>
         <h1 className="display-2 mb-10" style={{ color: "#3BB77E " }}>Please check your email</h1>

         <p className="font-xl text-center mb-30" style={{ fontWeight: "bold" }}>
            Please check your email for the password reset link. Click on the link provided to create a new password. If you can't find the email in your inbox, remember to check your spam or junk folder.
         </p>
      </div>
   )
}

export default CheckEmail
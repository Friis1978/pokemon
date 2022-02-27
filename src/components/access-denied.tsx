import { signIn } from "next-auth/react"

export default function AccessDenied({darkTheme}) {
  return (
    <div className={`container mx-auto max-w-6xl my-5 text-center ${darkTheme ? 'text-white' : 'text-dark'}`}>
      <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </div>
  )
}
import EmailConfirmed from "./component"

interface Props{
  params:Promise<{userId: string; token: string}>,
  searchParams: Promise<{callbackUrl: string}>
}

export default async function EmailConfirmedPage({params, searchParams}:Props) {
  const {userId, token} = await params;

  
  return <EmailConfirmed   userId={userId} token={token} />
}

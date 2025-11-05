
import ConfirmResetPassword from "./component"

interface Props{
    params: Promise<{userId: string, token: string}>
}

export default async function ConfirmPasswordResetPage({params}:Props) {
    const {token, userId} = await params;
    
    return <ConfirmResetPassword token={token} userId={userId} />
}

import {client} from 'client'

export default function MyPage() {
    const { isLoading: isAuthLoading, isAuthenticated } = client.auth.useAuth({
        shouldRedirect: true,
    })

    const { isLoggedOut, logout } = client.auth.useLogout()


    /**
     * Not authenticated
     */
    if ( !isAuthenticated || isLoggedOut ) {
        return <div>Not authenticated</div>
    }

    return (
        <div>
            <p>My auth content</p>
            <a href="#" onClick={() => logout()}>Log out</a>
        </div>
    )
}
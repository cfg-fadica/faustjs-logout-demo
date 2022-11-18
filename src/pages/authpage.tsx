import { client } from 'client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MyPage() {
    const router = useRouter()
    const [ shouldRedirect, setShouldRedirect ] = useState(false)
    const { isAuthenticated } = client.auth.useAuth({
        shouldRedirect,
    })

    useEffect(() => {
        if( isAuthenticated && shouldRedirect ) {
            setShouldRedirect(false);
        }
        if( !isAuthenticated ) {
            setShouldRedirect(true);
        }
    }, [shouldRedirect, isAuthenticated])

    const { isLoggedOut, logout } = client.auth.useLogout()

    const customLogout = () => {
        logout().then((res) => {
            router.push(process.env.NEXT_PUBLIC_WORDPRESS_URL + '/wp-login.php?action=logout')
        })
    }

    /**
     * Not authenticated
     */
    if ( !isAuthenticated || isLoggedOut ) {
        return <div>Not authenticated</div>
    }

    return (
        <div>
            <p>My auth content</p>
            <a href="#" onClick={() => customLogout()}>Log out</a>
        </div>
    )
}
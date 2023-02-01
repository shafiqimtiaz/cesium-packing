import { useEffect } from 'react';
import { Header } from './Header';

const Layout = ({ title = 'Title', className, children }) => {
    useEffect(() => {
        document.title = title;
    }, [title])
    return (
        <div className={className}>
            <Header />
            {children}
        </div>
    );
}

export default Layout;
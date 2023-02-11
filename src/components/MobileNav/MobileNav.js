import styles from './MobileNav.module.scss';
import {elastic as Menu} from "react-burger-menu";
import Link from "next/link";
import {findMenuByLocation} from "../../lib/menus";
import useSite from "../../hooks/use-site";


const MobileNav = () => {

    const { menus } = useSite();
    const navigation = findMenuByLocation(menus, 'MOBILE');

    return (
        <Menu right>
            {navigation?.map((listItem) => {
                return(
                    <li key={listItem.id} className={styles.menuItem}>
                        <Link href={listItem.path}>{listItem.label}</Link>
                    </li>
                );
            })}
        </Menu>
      );
};

export default MobileNav;

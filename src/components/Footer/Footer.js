import Link from 'next/link';
import useSite from 'hooks/use-site';
import {findMenuByLocation} from 'lib/menus';
import styles from './Footer.module.scss';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {

  const { global = [], menus } = useSite();
  const { acfOptionsSocial, acfOptionsFooter, acfOptionsContact } = global;
  const navigation = findMenuByLocation(menus, 'FOOTER');

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="grid">
          <div className="col-sm-12">
              <div className={styles.socialWrap}>
              <a target="_blank" rel="noreferrer" href={acfOptionsSocial.themeSettingsSocial.facebook}><FaFacebookF /></a>
              <a target="_blank" rel="noreferrer" href={acfOptionsSocial.themeSettingsSocial.linkedin}><FaLinkedinIn /></a>
              <a target="_blank" rel="noreferrer" href={acfOptionsSocial.themeSettingsSocial.twitter}><FaTwitter /></a>
              </div>
              <p>Phone: {acfOptionsContact.contact.phone}</p>
              <p>Email: {acfOptionsContact.contact.phone}</p>

          </div>
          <div className="col-sm-12">
                <ul className={styles.footerMenu}>
                    {navigation?.map((listItem) => {
                        return(
                            <li key={listItem.id} className={styles.menuItem}>
                                <Link href={listItem.path}>{listItem.label}</Link>
                            </li>
                        );
                    })}
                </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerLegal}>
        <div className="container">
            <div className="grid">
                <div className="col-sm-12">
                    <p>
                        &copy; {new Date().getFullYear()} {acfOptionsFooter.themeSettingsFooter.copyright}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

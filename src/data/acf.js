import { gql } from '@apollo/client';

export const ABOUT_TEMPLATE = gql`
query AboutACF ($ID: ID!) {
  page(id: $ID) {
    hero: acfhero {
      copy
      title
      cta {
         title
         url
      }
      backgroundImage {
        sourceUrl
        mediaItemUrl
      }
    }
    about: templateAbout {
      aboutCopy
      aboutImage {
        sourceUrl
        mediaItemUrl
      }
    }
  }
}
`;




export const HOME_TEMPLATE = gql`
query HomeACF ($ID: ID!) {
  page(id: $ID) {
    hero: acfhero {
      copy
      title
      cta {
         title
         url
      }
      backgroundImage {
        sourceUrl
        mediaItemUrl
      }
    }
  }
}
`;


export const GLOBAL = gql`
query GlobalQuery {
	acfOptionsSocial {
		themeSettingsSocial {
			facebook
			linkedin
			twitter
		}
	}
	acfOptionsFooter {
		themeSettingsFooter {
			copyright
		}
	}
	acfOptionsContact {
		contact {
			email
			phone
		}
	}
}
`;
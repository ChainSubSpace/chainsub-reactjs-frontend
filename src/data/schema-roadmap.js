import React, {Fragment} from 'react'
import {STATUSES} from '../components/schema/schemaHelpers'

export const schemaConfig = {
  title: (
    <Fragment>
      Chainsub.Space's <strong>journey</strong>
    </Fragment>
  ),
  theme: 'theme_two'
}

export const schema =  [
  {
    title: 'In the beginning...',
    items: [
      {
        status: STATUSES.NULL,
        icon: 'rocket',
        link: 'https://crypto-hackathon.com',
        title: 'Inspiration',
        text:
          'N8tb1t and Hooftly decide to enter Turtlecoins Hackathon.'
      }
    ]
  },
  {
    title: 'A Project is Born',
    items: [
      {
        status: STATUSES.NULL,
        icon: 'megaphone',
        link: 'https://github.com/ChainSubSpace/chainsub-backend-server',
        title: 'Work Begins',
        text: '(December 1st) n8tbit begins to sculpt the backend while hooftly begins to write content and work on styling'
      },
      {
        status: STATUSES.NULL,
        icon: 'github',
        link: 'https://github.com/ChainSubSpace/chainsub-reactjs-frontend',
        title: 'Submission',
        text:
          '(December 9th) ChainSub.space begins beta and is submitted to the Hackathon.'
      }
    ]
  },
  {
    title: "What's to come",
    items: [
      {
        status: STATUSES.NULL,
        icon: 'doc',
        link: '',
        title: 'Continued Work',
        text:
          'n8tbit and hooftly will continue working on developing the platform eventually bringing it out of beta'
      },
      {
        status: STATUSES.NULL,
        icon: 'expose',
        link: '',
        title: 'Bring CSS to the world',
        text:
          'Create and employ strategies to bring Chiansub.space to users worldwide.'
      }
    ]
  },
  {
    title: 'How will we do this?',
    items: [
      {
        status: STATUSES.NULL,
        icon: 'security',
        link: '',
        title: 'UI/UX Improvements',
        text:
          'As this is a beta and MVC for the Turtlecoin Hackathon the UI/UX will be worked on heavily in the future.'
      },
      {
        status: STATUSES.NULL,
        icon: 'bitcoin',
        link: '',
        title: 'Extended Support',
        text:
          'CSS Plans to eventually support multiple currencies so authors can choose how their readers can tip them.'
      },
      {
        status: STATUSES.NULL,
        icon: 'app',
        link: '',
        title: 'Mobile App',
        text: 'CSS wants to provide an easy to access Smart Phone App for people on the go. Use CSS anywhere anytime with ease.'
      }
    ]
  },
  {
    title: 'Future Features',
    items: [
      {
        status: STATUSES.NULL,
        icon: 'test',
        link: '/blog',
        title: 'Collaborative Editing',
        text:
          'Addition of collabrative editing so that you and your colleagues can work together in real time.'
      },
      {
        status: STATUSES.NULL,
        icon: 'opensource',
        link: '',
        title: 'Custom Channel Creation',
        text:
          'Authors will have the abilty to choose a Channel or create one where they and others can curate their content.'
      },
      {
        status: STATUSES.NULL,
        icon: 'validation',
        link: '',
        title: 'Subscription',
        text:
          'Readers will be able to subscribe to authors to allow them to always stay up to date with their favorite content'
      },
      {
        status: STATUSES.NULL,
        icon: 'analytics',
        link: '',
        title: 'Author Ratings',
        text:
          'A rating system where readers can rate authors allowing popular authors to be fatured in a spotlight section.'
      },
      {
        status: STATUSES.NULL,
        icon: 'mobile',
        link: '',
        title: 'Push Notifications',
        text:
          'A push notification service to let you know how all your posts are doing. Stay up to date, all the time.'
      },
      {
        status: STATUSES.NULL,
        icon: 'expose',
        link: '',
        title: 'Multi-Language Support',
        text:
          'We plan to support a multitude of languages so you can patricipate with the language of our choosing.'
      }
    ]
  },
  {
    title: 'Get Involved!',
    items: [
      {
        status: STATUSES.NULL,
        icon: 'discord',
        link: 'https://discord.gg/yAkzGYB',
        title: 'Join Discord!',
        text:
          "Join Chainsub.space's discord and come help us build a community around the project."
      },
      {
        status: STATUSES.NULL,
        icon: 'github',
        link: 'https://github.com/ChainSubSpace',
        title: 'Contribute!',
        text:
          'Chainsub.space is open source and as such anyone is free to contribute.  Shoot over to github and take a look.'
      }
    ]
  },
]

import React, { Fragment } from 'react'

export const schemaConfig = {
  title: (
    <Fragment>
      The ChainSub <strong>Developers</strong> and <strong>Contributors</strong>
    </Fragment>
  ),
  theme: 'theme_one'
}

export const schema = [
  {
    title: 'Core Developers',
    items: [
      {
        avatar: '/contributors/core/n8tb1t.jpg',
        links: {
          GitHub: 'https://github.com/n8tb1t',
          Twitter: 'https://twitter.com/n8tb1t',
          Email: 'mailto:n8tb1t@gmail.com'
        },
        title: 'N8tb1t',
        text:
          'Has more than 10 years of experience working in big startups around the world, served as a developer in the Israeli defense force, fluent in English, Hebrew and Russian, hooked on crypto since 2016. Currently, working on the project full time.'
      },
      {
        avatar: '/contributors/core/hooftly.jpg',
        links: {
          GitHub: 'https://github.com/hooftly',
          Twitter: 'https://twitter.com/hooftly',
          Email: 'mailto:hooftly@protonmail.com'
        },
        title: 'Hooftly',
        text:
          'Hooftly is a self taught junior developer who eats, breathes and sleeps everything Blockchain.  Hooftly wants to see a world where people truly are free from the shackles of big banks and is a believer in trying to strive for a decentralized world through technology.'
      }
    ]
  },
  {
    title: 'Friendly devs, who helped us to make ChainSub',
    // type: 'small',
    items: [
      {
        avatar: '/contributors/contributors/dirtybits.png',
        links: {
          GitHub: 'https://github.com/dirtybits',
          Twitter: 'https://twitter.com/Menutra',
          Email: 'mailto:dirtybitsofficial@gmail.com'
        },
        title: 'Dirtybits',
        text:
          'Graduated from an IT department of reputable US university, worked at Google. Currently working as a DevOps(C++) developer. He is very passionate about crypto, well oriented in crypto space in general, one of the TurtleСoin contributors.'
      },
      {
        avatar: '/contributors/contributors/thegoldensparrow.png',
        links: {
          Blog: 'https://www.cat7.network/',
          Reddit: 'https://www.reddit.com/user/TheGoldenSparrow/',
          Email: 'mailto:goldensparrow@protonmail.com'
        },
        title: 'TheGoldenSparrow',
        text:
          'Is an old member of the crypto space community, an author of cat7 blog, where you can find an ample of technical information about Catalyst. He is currently representing Catalyst on various media platforms and helping the new members of the community.'
      },
      {
        avatar: '/contributors/contributors/zpalmtree.jpg',
        links: {
          GitHub: 'https://github.com/zpalmtree'
        },
        title: 'Zpalmtree',
        text: 'Blockchain Developer.'
      }
    ]
  },
  {
    title: 'Turtle Coin Community',
    items: [
      {
        links: {
          Discord: 'https://discord.gg/Wf8hsBU'
        },
        title: 'Devs and Influencers:',
        TextType: ({ children }) => <span>{children}</span>,
        text: (
          <ul>
            <li>@RockSteady</li>
            <li>@Pluto|WRKZ</li>
            <li>@BrandonLehmann</li>
          </ul>
        )
      }
    ]
  }
]

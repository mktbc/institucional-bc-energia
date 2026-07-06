import { FC } from 'react'

import { socialLinks } from '@/components/Layout/Footer/Footer.data'
import { itemsData } from '@/components/Navbar/Items.data'
import Image from '@/components/Image'
import Link from '@/components/Link'

import ItemsCol from './ItemsCol'

const Footer: FC = () => (
  <>
    <footer
      className="px:lg-0 relative mt-auto bg-zinc-900 bg-cover px-8 py-24"
      style={{ backgroundImage: `url('/img/global/footer-bg.png')` }}
    >
      <div className="container mx-auto text-center">
        <div className="flex flex-col gap-9 lg:flex-row">
          <div className="basis-1/4 text-white">
            <Image
              className="mx-auto mb-8 lg:mb-14"
              src="/Logo-BC-Energia-Vertical-Branco.svg"
              alt="BC Energia"
              width={257}
              height={148}
            />
            <div className="flex flex-col gap-6 lg:gap-8">
              <div>
                <h2 className="mb-2 text-lg">Endereço em Goiânia:</h2>
                <p>
                  Av. Dep. Jamel Cecílio, c/ rua 56, nº 2929, Salas 2802/2803 - Ed. Brookfield
                  Towers Torre B - Jardim Goiás, Goiânia - GO, 74810-240
                </p>
              </div>
              <div className="md:flex-1">
                <h2 className="mb-2 text-lg">Endereço em São Paulo:</h2>
                <p>
                  Av. Pres. Juscelino Kubitschek, 360 - 7º andar cj71 - Edifício JK 360 -Vila Nova
                  Conceição, São Paulo - SP, 04543-000
                </p>
              </div>
            </div>
          </div>
          {itemsData.map((items, index) => (
            <div key={items.id} className="basis-1/4">
              <ItemsCol key={items.id} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-10 text-center">
        <h5 className="text-2xl uppercase text-white">Siga nossas redes</h5>
        <ul className="flex justify-center gap-8">
          {socialLinks.map((item) => (
            <Link title={item.name} key={item.name} href={item.url} target="_blank">
              <Image src={item.icon} alt="Icone" width={40} height={40} />
            </Link>
          ))}
        </ul>
      </div>
    </footer>
    <div className="bg-teal-600 pb-5 pt-6 text-white">
      <div className="container mx-auto text-center">
        <strong>© GRUPO BC ENERGIA - 2024</strong> | TODOS OS DIREITOS RESERVADOS
      </div>
    </div>
  </>
)

export default Footer

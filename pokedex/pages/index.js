import Layout from "../components/Layout"
import Link from "next/Link"
import Image from "next/Image"

export default function Home({pokemon}) {
  return (
    <Layout title="NextJs Pokedex">
        <h1 className="text-4xl mb-8 text-center">NextJs Pokedex</h1>
        <ul>
          {pokemon.map((p, index) => (
            <li key={index}>
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                  <img src={p.image} alt={p.name} className="w-20 h-20 mr-3"/>
                  <span className="mr-2 font-bold">{index + 1}. </span>
                  {p.name}
                </a>
              </Link>

            </li>
          ))}
        </ul>

    </Layout>
  )
}



export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
    const {results} = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedindex = ("00" + (index + 1)).slice(-3) //returns 001 or 00100
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedindex}.png`
      return {
        ... result,
        image,

      }
    })
    return{
      props: { pokemon }
    }
  } catch (err) {
    console.error(err);
  }
}
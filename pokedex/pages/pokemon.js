import React from 'react'
import Layout from '../components/Layout';
import Link from 'next/link'

export default function pokemon({ p }) {
    console.log(p)
    return (
        <Layout title={p.name}>
            <h1 className="text-4xl mb-2 text-center capitalize">{p.name}</h1>
            <img src={p.image} alt={p.name} className="mx-auto" />
            <p><span className="font-bold mr-2">Weight: </span>{p.weight}</p>

            <p><span className="font-bold mr-2">Height: </span>{p.height}</p>

            <h2 className="text-2xl mt-6 mb-2">Types</h2>
            {p.types.map(({ type }, index) => <p key={index}>{type.name}</p>)}

            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl underline">Home</a>
                </Link>
            </p>

        </Layout>
    )
}


export async function getServerSideProps({query}) {
    const id = query.id;
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const p = await res.json();
        const paddedindex = ("00" + (id)).slice(-3) //returns 001 or 00100
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedindex}.png`
        p.image = image

        return {
            props: {p},
        }

    } catch (err) {
        console.error(err);
    }
}

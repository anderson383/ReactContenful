import {createClient} from "contentful";
import Image from "next/image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
    space: "fxc6w59e837l",
    accessToken: "EHAM4wbuCGpbUiaNydpzfRPQ7s1rCdEeXAqr5zZYOyQ"
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({ content_type: 'recipe' })

    const paths = res.items.map(item => (
        {
            params: { slug: item.fields.slug }
        }
    ))
    console.log(paths)
    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps ({params}) {
    const {items} = await client.getEntries({
        content_type: 'recipe',
        'fields.slug': params.slug
    })
    console.log(items[0])
    return {
        props: { recipe: items[0] }
    }
}

export default function RecipeDetails({ recipe }) {
    console.log(recipe.fields)
  const { featuredImagen, title, cookingTime, ingredients, method } = recipe.fields
  return (
    <div>
      <div className="banner">
          <Image
            src={'https:' + featuredImagen.fields.file.url}
            width={featuredImagen.fields.file.details.image.width}
            height={featuredImagen.fields.file.details.image.height}
          />
      </div>
        <div className="info">
            <p>Take about { cookingTime } minxs to cook.</p>
            <h3>Ingredients:</h3>
            {
                ingredients.map((item, index) => (
                    <span key={index} >{item}</span>
                ))
            }
        </div>
        <div className="text">
            {documentToReactComponents(method)}
        </div>
    </div>
  )
}
import Image from "next/image";
import Link from "next/link";
export const RecipeCard = (props) => {
    const {title, slug, cookingTime, thumbnail} = props.recipe.fields
    return (
        <>
            <div className="card">
                <div className="featured">
                    <Image
                        src={'https:' + thumbnail.fields.file.url}
                        width={thumbnail.fields.file.details.image.width}
                        height={thumbnail.fields.file.details.image.height}
                    />
                </div>
                <div className="content">
                    <div className="info">
                        <h4>{ title }</h4>
                        <p>Takes aprox {cookingTime} mins to make</p>
                    </div>
                    <div className="actions">
                        <Link  href={"/recipes/" + slug}>Cook this</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
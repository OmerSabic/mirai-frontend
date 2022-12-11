import { useNavigationCollections } from "@lib/hooks/use-layout-data";
import Link from "next/link";

type CollectionsPickerProps = {
  setCollection: (collection: string) => void
}

const CollectionsPicker = ({
  setCollection
}: CollectionsPickerProps) => {
  const { data: collections, isLoading: loadingCollections } = useNavigationCollections()

  const updateCollection = (collection: string) => {
    if(!collection) return
    setCollection(collection)

    return
  }

  return (
    <div className="w-dyn-list">
      <div role="list" className="collection-list w-dyn-items">
        {(!loadingCollections && collections) ? collections.map(collection => (
            <div role="listitem" className="w-dyn-item" key={collection.id}>
                <button className="products-category-link" onClick={() => updateCollection(collection.id)}>{collection.title}</button>
            </div>
          )
        )
          : <div>Loading...</div>
        }
      </div>
    </div>
  )
}

export default CollectionsPicker

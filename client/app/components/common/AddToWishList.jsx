import Checkbox from "./Checkbox";
import { HeartIcon } from "./Icon";

const AddToWishList = (props) => {
  const { id, liked, enabled, updateWishlist, product } = props;

  return (
    <div className="add-to-wishlist">
      <Checkbox
        id={`checkbox_${id}`}
        name={"wishlist"}
        disabled={!enabled}
        checked={liked}
        label={<HeartIcon />}
        onChange={() => {
          updateWishlist(product);
        }}
      />
    </div>
  );
};

export default AddToWishList;

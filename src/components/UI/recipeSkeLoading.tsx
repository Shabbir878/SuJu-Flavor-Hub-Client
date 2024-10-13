import RecipeSkeleton from "../Card/RecipeSkeleton";

const recipeSkeLoading = () => {
  return (
    <div>
      {[...Array(4)].map((_, index) => (
        <RecipeSkeleton key={index} />
      ))}
    </div>
  );
};

export default recipeSkeLoading;

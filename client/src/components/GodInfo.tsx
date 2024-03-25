import Heart from "@/assets/Heart";
import HeartOutline from "@/assets/HeartOutline";
import { favouritePostAsync } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";
import { Post, User } from "@/utils/types";
import { NextPage } from "next";

interface Props {
  post: Post;
  user: User | null;
}

const GodInfo: NextPage<Props> = ({ post, user }) => {
  const dispatch = useAppDispatch();
  let newDescription = "";
  const addBreakLines = () => {
    let timesOfDotOccurance = 0;
    for (let i = 0; i < post.description.length; i++) {
      newDescription += post.description[i];
      if (post.description[i] === ".") {
        timesOfDotOccurance++;
      }
      if (timesOfDotOccurance === 4) {
        newDescription += "<br/> <br/>";
        timesOfDotOccurance = 0;
      }
    }
  };
  addBreakLines();

  const handleHeartOutlineClick = (e: React.MouseEvent<SVGElement>) => {
    dispatch(favouritePostAsync(post.id));
  };
  console.log(user);
  return (
    <div className="flex-grow flex flex-col">
      <h2 className="text-primary self-center text-2xl font-josefin-sans font-bold lg:text-4xl">
        {post.name}
      </h2>
      <p
        dangerouslySetInnerHTML={{ __html: newDescription }}
        className="text-primary-text border-t-4 border-primary px-2 pt-5 mx-2 text-sm font-fira-mono lg:text-lg"
      />
      {user ? (
        <div className="bg-white w-[3.5rem] h-[3.5rem] rounded-[50%] mt-5 ml-2 flex items-center justify-center">
          {user.favouritePosts.find(
            (favouritePost) => favouritePost.id === post.id
          ) ? (
            <Heart className="w-[3rem] h-[3rem] text-primary" />
          ) : (
            <HeartOutline
              onClick={handleHeartOutlineClick}
              className="w-[3rem] h-[3rem] text-primary"
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GodInfo;

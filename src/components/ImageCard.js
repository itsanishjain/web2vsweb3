import GradientButton from './GradientButton';

export default function ImageCard({ url, voteCount }) {
  return (
    <div>
      <div className="mt-8 max-w-sm mx-auto shadow-lg">
        <div className="bg-gradient-to-r from-yellow-200 to-yellow-400  rounded-lg">
          <div className="h-full w-full flex flex-col">
            <img alt="avatar" src={url} />
            <p className="text-center p-2">Votes: {voteCount}</p>
            <div className='p-2'>
              <GradientButton text="Upvote" onClick={() => console.log("DONE")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

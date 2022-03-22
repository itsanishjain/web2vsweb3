import GradientButton from './GradientButton';

export default function ImageCard({ url, voteCount }) {
  return (
    <div className="mt-8">
      <div className="bg-gradient-to-r from-yellow-200 
        to-yellow-400 rounded-lg">
        <div className="h-full w-full flex flex-col">
          <img className='w-64 h-64' alt="avatar"
            src={url} />
          <p className="text-center p-2">Web2 me</p>
          <p className="text-center p-2">Votes: {voteCount}</p>
          <div className='p-2'>
            <GradientButton text="Upvote" onClick={() => console.log("DONE")} />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useMemo } from 'react';
import OneThing from './OneThing';

const AllThings = (props) => {
  const CONFIDENCE = (props.votes.length / props.things.length);
  const PRIOR = 0.5;

  const mapped = useMemo(() => {
    return props.things.map(thing => {
      const totalVotes = props.votes.filter(vote => vote.thing_id === thing._id);
      const yesVotes = totalVotes.reduce((sum, vote) => sum + vote.vote, 0);
      const posterior = Math.round(100 * ((CONFIDENCE * PRIOR + yesVotes) / (CONFIDENCE + totalVotes.length)));
      return <OneThing
        key={thing._id}
        userId={props.userId}
        thing={thing}
        score={totalVotes.length ? posterior : '?'}
        votes={props.votes}
        votesForThisThing={totalVotes}
        setVotes={props.setVotes}
      />
    });
  }, [props.things, props.votes]);

  return (
    <div className="container">
      {mapped}
    </div>
  );
};

export default AllThings;

import JoinButton from './JoinButton';

export default function JoinCTA() {
  return (
    <section id="join" className="section section--blue join" aria-labelledby="join-title">
      <span className="grid-bg" aria-hidden="true" />
      <div className="corner-frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container join__inner">
        <p className="eyebrow">02 — Join</p>
        <h2 id="join-title">Want to Join IEEE BNU?</h2>
        <p className="join__sub">Your journey starts here.</p>
        <JoinButton className="btn btn-white btn-lg">Join Our Community</JoinButton>
      </div>
    </section>
  );
}

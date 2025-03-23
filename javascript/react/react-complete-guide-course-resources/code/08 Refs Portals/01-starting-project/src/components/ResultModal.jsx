export function ResultModal({ dialogRef, result, targetTime }) {
    
  return <dialog ref={dialogRef} className="result-modal">
        <h2>You {result}</h2>
        <p>Target time: {targetTime}</p>
        <form method="dialog">
            <button>CLOSE</button>
        </form>
      </dialog>
}

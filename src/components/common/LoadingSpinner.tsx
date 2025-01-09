import classes from "styles/LoadingSpinner.module.css";

export default function LoadingSpinner({ size = 80 }) {
  return (
    <div className="flex justify-center">
      <div
        className={classes["lds-ring"]}
        style={{
          width: `${50}px`,  
          height: `${50}px`,
        }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

import { optimizedImageProps, backgroundAvifProps } from "@/lib/optimized-images";
export function NextSteps() {
  return (
    <section className={"ivory-next"} id={"getting-started"}>
      <picture style={{ display: "contents" }}>
      <source style={{ display: "none" }} type="image/avif" {...backgroundAvifProps("/assets/ivory-lake.jpg", "max(100vw, 1080px)")} />
      <img
        className="ivory-next-background"
        src="/assets/presentation/delivery/lake-1448.webp"
        {...optimizedImageProps("/assets/ivory-lake.jpg", "max(100vw, 1080px)")}
        width="2172"
        height="724"
        alt=""
        loading="lazy"
      />
      </picture>
      <div>
        <h2>{"Take the Next Step"}</h2>
        <p>
          {
            "It’s not always easy to reach out, but you don’t have to do this alone."
          }
          <br />
          {"We’re here to help."}
        </p>
        <div className={"ivory-actions"}>
          <a className={"button"} href={"/contact/"}>
            {"Book an Appointment"}
          </a>
          <a className={"button button-outline"} href={"tel:9032838729"}>
            {"Call (903) 283-8729"}
          </a>
        </div>
      </div>
    </section>
  );
}

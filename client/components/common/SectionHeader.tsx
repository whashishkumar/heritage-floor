interface SectionHeader {
  heading?: string;
  subHeading?: string;
  description?: string;
  headingCss?: string;
  subHeadingCss?: string;
  descriptionCss?: string;
  mainCss?: string;
}
export default function SectionHeader({
  heading,
  subHeading,
  description,
  headingCss,
  subHeadingCss,
  descriptionCss,
  mainCss,
}: SectionHeader) {
  return (
    <>
      <div>
        <div className={`${mainCss}`}>
          <h2
            className={`text-primaryTwo uppercase ${
              headingCss ? ` ${headingCss}` : ' text-base  font-bold tracking-wider '
            } `}
          >
            {heading}
          </h2>
          <h3
            className={`text-[2.5rem] sm:text-[2.5rem]  text-darkBlue  leading-[1.3750] ${subHeadingCss} `}
          >
            {subHeading}
          </h3>

          <p className={`text-black text-base sm:text-lg   align-middle ${descriptionCss}`}>
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

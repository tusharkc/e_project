import React from 'react';

const NumberCards = ({
  numbersTextColor = 'white',
  platformNameColor,
  platformName,
  cardBgColor,
  cardCount,
  hasBorderColor = false,
  cardBorderColor,
}) => {
  return (
    <div
      className="number_section_card p-4 m-3"
      style={{ background: cardBgColor, border: hasBorderColor && `1px solid ${cardBorderColor}` }}
    >
      <h2 style={{ color: numbersTextColor }} className="font-weight-bold number_section_count">
        {cardCount}
      </h2>
      <h3 className="font-weight-bold platform_name" style={{ color: platformNameColor }}>
        {platformName}
      </h3>
    </div>
  );
};

export default NumberCards;

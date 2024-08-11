import React, { useState } from "react";

interface InputRadioProps {
  label: string
  key: number
  refName: string
  setSelectedOption: (key: number) => void
  isComplete: boolean
  isCorrect: boolean
  optionValue: number
  selectedOption: number | undefined
}

const InputRadio: React.FC<InputRadioProps> = ({
  label,
  refName,
  setSelectedOption,
  isComplete,
  isCorrect,
  optionValue,
  selectedOption,
}) => {
  const [isSelected, setIsSelected] = useState(false)
  const onValueChange = (event: any) => {
    console.log("sel")
    setSelectedOption(optionValue)
    setIsSelected(true)
    /*{
      //optionId: labelOption.id,
      //answer: event.target.value,
    })*/
  }

  let labelBg = ""
  if (isComplete) {
    if (isCorrect) {
      labelBg = "success-answer"
    } else if (selectedOption === optionValue) {
      labelBg = "error-answer"
    }
  }

  return (
    <div style={{ margin: 10 }}>
      <label className={labelBg}>
        <input
          disabled={isComplete}
          name={refName}
          type="radio"
          value={optionValue}
          onChange={onValueChange}
          checked={selectedOption === optionValue || isSelected}
        />
        {label}
      </label>
      <br />
    </div>
  )
}

export default InputRadio;

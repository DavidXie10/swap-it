import Checkbox from "../Checkbox";

export default function ImageCheckbox ({
    fileURL, onClick, isChecked
}) {
    return (
        <label>
            <div className='mr-3 mt-2 w-fit relative inline-block'>
                <div className="absolute top-0 right-0" onClick={onClick}>
                    <Checkbox isChecked={isChecked}/>
                </div>
                <img src={fileURL || console.log("file not found")} alt={"Foto del artículo a intercambiar"} width={'200px'} height={'80px'} />
            </div>
        </label>
    )
}
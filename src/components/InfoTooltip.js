import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({authStatus, isOpen, onClose}) {
  return (
    <div className={isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <img
          src={authStatus ? success : fail}
          alt={authStatus ? 'Успешная регистрация' : 'Неудачная регистрация'}
          className="popup__image"
        />
        <p>{
          authStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
        }</p>
        <button type="button" className="popup__close-button" onClick={onClose}/>
      </div>
    </div>
  )
}

export default InfoTooltip;

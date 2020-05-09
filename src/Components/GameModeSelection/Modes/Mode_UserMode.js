import React from 'react';

class Mode_UserMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null
    }
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.setState({form: this.formRef.current.elements});
  }

  checkMinValue(event, min) {
    if (event.value < min)  event.value = min;
    else if (event.value > 100) event.value = 100;
    this.props.setForm(this.state.form);
  }

  render() {
    return (
      <div className="text-left">
        <p>
          Создайте свой режим игры в Крестики-Нолики.<br />
          Вы можете задать свой размер поля (не меньший 3х3 и не больший 100x100), количество игроков (от 2 до 6),
          длину выигрышной последовательности (не меньше 3), а также количество знаков которые может поставить
          игрок за ход.<br />
          Задайте, пожалуйста, параметры игры:<br />
        </p>
        <form ref={this.formRef}>
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <span>Размер поля</span>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-5" style={{paddingRight:0}}>
                  <input type="number" className="form-control" defaultValue='3'
                         onBlur={(e)=>{this.checkMinValue(e.target, 3)}} />
                </div>
                <div className="col-2 justify-content-center d-flex align-items-center" style={{padding:0}}>
                  <span><i className="fa fa-close"></i></span>
                </div>
                <div className="col-5" style={{paddingLeft:0}}>
                  <input type="number" className="form-control" defaultValue='3'
                  onBlur={(e)=>{this.checkMinValue(e.target, 3)}} />
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center">
            <div className="col-6">
              <span>Количество игроков</span>
            </div>
            <div className="col-6">
              <select className="form-control" onChange={()=>{this.props.setForm(this.state.form)}}>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          </div>

          <div className="row d-flex align-items-center">
            <div className="col-7">
              <span>Длина выигрышной последовательности</span>
            </div>
            <div className="col-5">
              <input type="number" className="form-control" defaultValue='3'
              onBlur={(e)=>{this.checkMinValue(e.target, 3)}} />
            </div>
          </div>

          <div className="row d-flex align-items-center">
            <div className="col-7">
              <span>Количество знаков, которые можно поставить за ход</span>
            </div>
            <div className="col-5">
              <input type="number" className="form-control" defaultValue='1'
              onBlur={(e)=>{this.checkMinValue(e.target, 1)}} />
            </div>
          </div>

        </form>
      </div>
    )
  }
}

export default Mode_UserMode;

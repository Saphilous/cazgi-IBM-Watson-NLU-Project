import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        const emotionstomap = this.props.emotions
        const mappingemotions = Object.keys(emotionstomap).map(ems =>
            {
                console.log(ems)
                return(
                    <>
                    <tr>
                    <td>{ems}</td>
                    <td>{emotionstomap[ems]}</td>
                    </tr>
                    </>
                )
            })
      return (  
        <div>

          <table className="table table-bordered">
            <tbody>
            {mappingemotions}
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;

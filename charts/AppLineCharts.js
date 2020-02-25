import React, { Component } from 'react';
import { WingBlank, WhiteSpace,TextareaItem,Toast } from 'antd-mobile';
import "../../common/common.css";
import IsNumberFunc from "../../common/IsNumberFunc.js";
import MyHeader from '../../components/MyHeader.js';
import { Button,Table} from 'element-react';
import 'element-theme-default';
import { Line } from 'react-chartjs-2';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import statementChart from "./statementChart.md";
import ChartDialog01SettingContainers from '../../redux/containers/ChartDialog01SettingContainers.js';

class AppLineCharts extends Component {

  constructor(props) {
      super(props);
      this.state = {xaxis: props.xaxis||['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    yaxis: props.yaxis||[65, 59, 80, 81, 56, 55, 40],
                    edata: props.edata||[],
                    columns: [
                      { label: "#",
                        prop: "rowid",
                        width: 70
                      },
                      { label: "内容",
                        prop: "context"
                      }
                    ],
                    display_name: props.display_name||"none",
                    display_console: props.display_console||"none",
                    dialogvisible: props.dialogvisible||false,
                    chart_label: props.chart_label||'dataset',
                    chart_label_position: props.chart_label_position||'top',
                    chart_label_enable: props.chart_label_enable||true,
                    chart_title: props.chart_title||'dataset',
                    chart_title_position: props.chart_title_position||'top',
                    chart_title_enable: props.chart_title_enable||true,
                    chart_xaxis: props.chart_xaxis||'x',
                    chart_xaxis_enable: props.chart_xaxis_enable||false,
                    chart_yaxis: props.chart_yaxis||'y',
                    chart_yaxis_enable: props.chart_yaxis_enable||false,
                    chart_window_width: props.chart_window_width||100,
                    chart_window_height: props.chart_window_height||70
                   };
  }

  handleClickDialog() {
      this.props.dialogVisibleDataCreate(true);
  }

  handleClickSubmit (e) {
       var input_data = this.refs.input_data.props.value;
       if(input_data===undefined||input_data.length<1){
         Toast.info(global.constants.const_app_chart_inputdata, 2, null, false);
         return;
       }
       var arr = input_data.split(/[\r\n|\n]/);
       var xarr = [];
       var yarr = [];
       var earr = [];
       var input_display_name = "none";
       var input_display_console = "none";
       for ( var i=0;i<arr.length;i++) {
           if(arr[i].trim().length<1){
              var row = {};
              row.rowid = i+"";
              row.context = arr[i];
              earr.push(row);
              input_display_name = "block";
              continue;
           }
           var subarr = arr[i].split(/[,|;|，]/);
           if(subarr.length>1&&IsNumberFunc(subarr[1].trim())){
               xarr.push(subarr[0]);
               yarr.push(Number(subarr[1].trim()));
               input_display_console = "block";
           }else {
              row = {};
              row.rowid = i+"";
              row.context = arr[i];
              input_display_name = "block";
              earr.push(row);
           }
       }
       this.props.arrayXDataCreate(xarr);
       this.props.arrayYDataCreate(yarr);
       this.props.arrayEDataCreate(earr);
       this.props.displayNameDataCreate(input_display_name);
       this.props.displayConsoleDataCreate(input_display_console);
  }

  render() {
    const { getFieldProps } = this.props.form;
    const xaxis0  = this.props.xaxis;
    const yaxis0 = this.props.yaxis;
    const edata = JSON.parse(JSON.stringify(this.props.edata));
    const displayname = this.props.display_name;
    const displayconsole = this.props.display_console;
    const chart_label = this.props.chart_label;
    const chart_label_position = this.props.chart_label_position;
    const chart_label_enable = this.props.chart_label_enable;
    const chart_title = this.props.chart_title;
    const chart_title_position = this.props.chart_title_position;
    const chart_title_enable = this.props.chart_title_enable;
    const chart_xaxis = this.props.chart_xaxis;
    const chart_xaxis_enable = this.props.chart_xaxis_enable;
    const chart_yaxis = this.props.chart_yaxis;
    const chart_yaxis_enable = this.props.chart_yaxis_enable;
    const chart_window_width = this.props.chart_window_width;
    const chart_window_height = this.props.chart_window_height;
 
    const data = {
        labels: xaxis0,
        datasets: [
        {
          label: chart_label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: yaxis0
        }
       ]
    };
   
    return (
        <div>
              <MyHeader myheadertitle={ global.constants.const_app_chart_line } />
              <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                  <div key='line-1' style={{ display: displayconsole }} >
                    <Line
                      data={data}
                      width={chart_window_width}
                      height={chart_window_height}
                      options={{ title: {display: chart_title_enable ,text: chart_title ,position: chart_title_position },
                                 legend:{display: chart_label_enable ,position: chart_label_position },   
                                 scales:{xAxes: [{ scaleLabel: {display:chart_xaxis_enable, labelString: chart_xaxis}  }],yAxes: [{ scaleLabel: {display:chart_yaxis_enable,labelString: chart_yaxis } }] }
                              }}
                    />
                  </div>
                  <WhiteSpace size="lg" />
                  <div key='bnt-1' style={{display:'inline-block' }}> 
                      <Button type="text" icon="setting" onClick={() => {this.handleClickDialog()}}  ></Button>
                      <Button icon="view" onClick={() => {this.handleClickSubmit()}} > {global.constants.const_execute} </Button>     
                  </div>
                  <WhiteSpace size="lg" />
                  <TextareaItem
                      {...getFieldProps('input_data')}
                      ref = "input_data"
                      placeholder={global.constants.const_app_chart_input_region}
                      autoHeight
                      labelNumber={5}
                  />
                  <WhiteSpace size="lg" />
                  <div key='tb-1' style={{ display: displayname }}>
                    {global.constants.const_app_chart_err_title}
                    <WhiteSpace size="lg" />
                    <Table
                     style={{width: '100%'}}
                     columns={this.state.columns}
                     maxHeight={200}
                     data={edata}
                     showHeader={false}
                    />
                  </div>
                  <WhiteSpace size="lg" />
                  <ReactMarkdown
                    source={statementChart}
                    escapeHtml={false}
                  />
                  <ChartDialog01SettingContainers />
              </WingBlank>
        </div>
    );
  }

  static propTypes = {
    xaxis: PropTypes.array,
    arrayXDataCreate: PropTypes.func,
    yaxis: PropTypes.array,
    arrayYDataCreate: PropTypes.func,
    edata: PropTypes.array,
    arrayEDataCreate: PropTypes.func,
    display_name: PropTypes.string,
    displayNameDataCreate: PropTypes.func,
    display_console: PropTypes.string,
    displayConsoleDataCreate: PropTypes.func,
    dialogvisible: PropTypes.bool,
    dialogVisibleDataCreate: PropTypes.func,
    chart_label: PropTypes.string,
    chart_label_position: PropTypes.string,
    chart_label_enable: PropTypes.bool,
    chart_title: PropTypes.string,
    chart_title_position: PropTypes.string,
    chart_title_enable: PropTypes.bool,
    chart_xaxis: PropTypes.string,
    chart_xaxis_enable: PropTypes.bool,
    chart_yaxis: PropTypes.string,
    chart_yaxis_enable: PropTypes.bool,
    chart_window_width: PropTypes.number,
    chart_window_height: PropTypes.number,
  }
}
const AppLineChartsWrapper = createForm()(AppLineCharts);
export default AppLineChartsWrapper;

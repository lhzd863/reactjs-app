import React, { Component } from 'react';
import { WingBlank, WhiteSpace,TextareaItem,Toast,ActivityIndicator } from 'antd-mobile';
import "../../common/common.css";
import IsNumberFunc from "../../common/IsNumberFunc.js";
import MyHeader from '../../components/MyHeader.js';
import { Button,Table} from 'element-react';
import 'element-theme-default';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import statementChart from "./statementCorrChart.md";

class AppCorrCharts extends Component {

  constructor(props) {
      super(props);
      this.state = {aval: props.aval||'',
                    bval: props.bval||'',
                    calval: props.calval||'',
                    url: props.url||'',
                    edata: props.edata||[],
                    cdata: props.cdata||[],
                    ccolumns: [
                      { label: "内容",
                        prop: "context"
                      }
                    ],
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
                    chart_leastsq_console_express_enable: props.chart_leastsq_console_express_enable||false,
                    loading_enable: props.loading_enable||'false'
                   };
  }

  handleClickDialog() {
      this.props.dialogVisibleDataCreate(true);
  }
 
  handleFitLine(xval,yval,earr,displayname,displayconsole) {
    
    var data;
    let accesstoken = '';
    if (JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0]===undefined||
          JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username===undefined){
          accesstoken = global.constants.const_default_accesstoken
    }else{
          accesstoken = JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].accesstoken;
    }
    this.props.loadingEnableCreate(true);
    let url = global.constants.const_api_url + "/app/cal/corr?accesstoken=" + accesstoken;
    fetch(url,{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        xval: xval,
        yval: yval
      })
     })
     .then(response => response.json())
     .then((dat) => {
         data=dat;
         console.log(data)
         this.props.loadingEnableCreate(false);
         this.props.arrayEDataCreate(earr);
         this.props.displayNameDataCreate(displayname);
         this.props.displayConsoleDataCreate(displayconsole);
         var arrlst = [];
         var row = {};
         row.context = global.constants.const_app_chart_corr_coefficient+":"+data[0].corr;
         arrlst.push(row);
         this.props.arrayConsoleDataCreate(arrlst);
     })
     .catch(function (err) {
          console.log(err);
     });
  }

  handleClickSubmit (e) {
       var input_data = this.refs.input_data.props.value;
       if(input_data===undefined||input_data.length<1){
         Toast.info(global.constants.const_app_chart_inputdata, 2, null, false);
         return;
       }
       var arr = input_data.split(/[\r\n|\n]/);
       var earr = [];
       var input_xval ="";
       var input_yval ="";
       var input_display_name = "none";
       var input_display_console = "none";
       var j = 0;
       for ( var i=0;i<arr.length;i++) {
           if(arr[i].trim().length<1){
              var row = {};
              row.rowid = i+"";
              row.context = arr[i];
              input_display_name = "block";
              earr.push(row);
              continue;
           }
           var subarr = arr[i].split(/[,|;|，]/);
           if(subarr.length>1&&IsNumberFunc(subarr[1].trim())&&IsNumberFunc(subarr[0].trim())){
               if(j===0){
                 input_xval = subarr[0].trim();
                 input_yval = subarr[1].trim();
               }else{
                 input_xval +=","+ subarr[0].trim();
                 input_yval +=","+ subarr[1].trim();
               }
               input_display_console = "block";
           }else {
              row = {};
              row.rowid = i+"";
              row.context = arr[i];
              input_display_name = "block";
              earr.push(row);
           }
           j++;
       }
       this.handleFitLine(input_xval,input_yval,earr,input_display_name,input_display_console);
  }

  render() {
    const { getFieldProps } = this.props.form;
    const edata = JSON.parse(JSON.stringify(this.props.edata));
    const cdata0 = JSON.parse(JSON.stringify(this.props.cdata));
    const displayname = this.props.display_name;
    const displayconsole = this.props.display_console;
    const chart_leastsq_console_express_enable = this.props.chart_leastsq_console_express_enable;
    const loading_enable = this.props.loading_enable;

    return (
        <div>
              <MyHeader myheadertitle={ global.constants.const_app_chart_corr_coefficient } />
              <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                  <div key='img-1' stype={{ display:displayconsole }}>
                      <ActivityIndicator toast text="Loading..."  animating={loading_enable}  />
                  </div>
                  <div key='line-1' style={{ display: (displayconsole==='block'&&chart_leastsq_console_express_enable)?'block':'none' }} >
                     <Table
                       style={{width: '100%'}}
                       maxHeight={200}
                       data={cdata0}
                       showHeader={false}
                       columns={this.state.ccolumns}
                     />
                  </div>
                  <WhiteSpace size="lg" />
                  <div key='bnt-1' style={{display:'inline-block' }}>
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
              </WingBlank>
        </div>
    );
  }

  static propTypes = {
    aval: PropTypes.string,
    avalDataCreate: PropTypes.func,
    bval: PropTypes.string,
    bvalDataCreate: PropTypes.func,
    edata: PropTypes.array,
    arrayEDataCreate: PropTypes.func,
    calval: PropTypes.string,
    calvalDataCreate: PropTypes.func,
    url: PropTypes.string,
    urlDataCreate: PropTypes.func,
    display_name: PropTypes.string,
    displayNameDataCreate: PropTypes.func,
    cdata: PropTypes.array,
    arrayConsoleDataCreate: PropTypes.func,
    chart_title: PropTypes.string,
    chartTitleDataCreate: PropTypes.func,
    chart_window_img_width: PropTypes.number,
    chartWindowImgWidthDataCreate: PropTypes.func,
    chart_window_img_height: PropTypes.number,
    chartWindowImgHeightDataCreate: PropTypes.func,
    chart_leastsq_console_express_enable: PropTypes.bool,
    chart_leastsq_real_value: PropTypes.string,
    chartLeastsqRealValueDataCreate: PropTypes.func,
    chart_leastsq_real_value_result_enable: PropTypes.bool,
    chartLeastsqRealValueResultEnableDataCreate: PropTypes.func, 
    chart_fitline_optimized_time: PropTypes.string,
    chart_fitline_loss_value: PropTypes.string,
    loading_enable: PropTypes.bool,
    loadingEnableCreate: PropTypes.func,
  }
}
const AppCorrChartsWrapper = createForm()(AppCorrCharts);
export default AppCorrChartsWrapper;

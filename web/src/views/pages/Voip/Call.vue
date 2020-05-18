<template>
    <div>
        <div class="container">
        <div class="row-fluid">
            <div class="span4 well">
              <label style="width: 100%;" align="center" id="txtRegStatus">
                </label>
                <label style="width: 100%;" align="center" id="txtCallStatus">
                </label>
                <h2>
                    Registration
                </h2>
                <br />
                <table style='width: 100%'>
                    <tr>
                        <td colspan="2" align="right">
                            <input type="button" class="btn btn-success" id="btnRegister" value="LogIn" disabled onclick='sipRegister();' />
                            &nbsp;
                            <input type="button" class="btn btn-danger" id="btnUnRegister" value="LogOut" disabled onclick='sipUnRegister();' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="divBtnCallGroup" class="btn-group">
                                <input type="button" id="btnCallSTD_D" style="margin: 0; vertical-align:middle; height: 100%;" class="btn btn-primary" value="CALL2" onclick='sipCall("call-audio" ,StationA);'/>
                            </div>&nbsp;&nbsp;
                            <div class="btn-group">
                                <input type="button" id="btnHangUp" style="margin: 0; vertical-align:middle; height: 100%;" class="btn btn-primary" value="HangUp" onclick='sipHangUp();' disabled />
                            </div>
                            
                        </td>
                    </tr>
                </table>
            </div>
            <div id="divCallCtrl" class="span7 well" style='display:table-cell; vertical-align:middle'>
                <table style='width: 100%;'>
                    <tr>
                        <td align='center'>
                            <div id='divCallOptions' class='call-options' style='opacity: 0; margin-top: 0px'>
                                <input type="button" class="btn" style="" id="btnMute" value="Mute" onclick='sipToggleMute();' /> &nbsp;
                                <input type="button" class="btn" style="" id="btnHoldResume" value="Hold" onclick='sipToggleHoldResume();' /> &nbsp;
                                <input type="button" class="btn" style="" id="btnTransfer" value="Transfer" onclick='sipTransfer();' /> &nbsp;
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id='divGlassPanel' class='glass-panel' style='visibility:hidden'></div>

    <ul id="ulCallOptions" class="dropdown-menu" style="visibility:hidden">
        <li><a href="#" onclick='sipCall("call-audio" ,StationD);'>Audio</a></li>
        <li><a href="#" onclick='sipCall("call-audiovideo" ,StationD);'>Video</a></li>
        <li id='liScreenShare'><a href="#" onclick='sipShareScreen();'>Screen Share</a></li>
        <li class="divider"></li>
        <li><a href="#" onclick='uiDisableCallOptions();'><b>Disable these options</b></a></li>
    </ul>

        
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created(){
        
    },
    methods:{

    },
    watch:{

    }
}
</script>

<style>

</style>
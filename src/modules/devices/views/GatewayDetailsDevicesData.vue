<template>
  <div class="details-view gateway-details-devices-data-view">
    <emq-details-page-head>
      <el-breadcrumb slot="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/devices/gateways' }">{{ $t('gateways.gateway') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentDevice">{{ currentDevice.deviceName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('gateways.deviceData') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div v-if="currentDevice" class="emq-tag-group" slot="tag">
        <emq-tag>{{ currentDevice.gatewayProtocolLabel }}</emq-tag>
      </div>
    </emq-details-page-head>

    <div class="detail-tabs">
      <gateway-detail-tabs></gateway-detail-tabs>
    </div>

    <device-data-table
      v-if="currentDevice"
      :url="`/device_capability_data?gatewayIntID=${$route.params.id}`"
      :record="currentDevice"
    >
    </device-data-table>
  </div>
</template>

<script>
import { currentDevicesMixin } from '@/mixins/currentDevices'
import EmqDetailsPageHead from '@/modules/common/EmqDetailsPageHead'
import EmqTag from '@/modules/common/EmqTag'
import GatewayDetailTabs from '../components/GatewayDetailTabs'
import DeviceDataTable from '../components/DeviceDataTable'

export default {
  name: 'gateway-details-devices-data-view',

  mixins: [currentDevicesMixin],

  components: {
    GatewayDetailTabs,
    EmqDetailsPageHead,
    EmqTag,
    DeviceDataTable,
  },

  data() {
    return {}
  },
}
</script>

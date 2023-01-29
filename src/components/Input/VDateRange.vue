<template>
  <el-form-item :label="fieldLabel" :prop="idName" class="v-form-item">
    <el-date-picker
      ref="root"
      v-model="dateRangeData"
      :name="idName"
      type="daterange"
      :format="'DD/MM/YYYY'"
      :value-format="'YYYY-MM-DD'"
      range-separator="até"
      start-placeholder="dd/mm/aaaa"
      end-placeholder="dd/mm/aaaa"
      v-bind="$attrs"
      @change="onChangeDate($event)"
    >
    </el-date-picker>
  </el-form-item>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'VDateRange',
  props: {
    fieldLabel: { type: String, required: true },
    idName: { type: String, required: true },
    start: {
      type: String,
      default: '',
      required: true
    },
    end: {
      type: [String],
      default: '',
      required: true
    }
  },
  setup(props, { emit }): any {
    const root = ref(null);

    const onChangeDate = (event) => {
      const dateStart = event ? event[0] : null;
      const dateEnd = event ? event[1] : null;

      emit('update:start', dateStart);
      emit('update:end', dateEnd);
    };

    return {
      root,
      onChangeDate
    };
  },
  data(): any {
    return {
      dateRangeData: [] as any[]
    };
  },
  updated(): void {
    (this as any).dateRangeData = [(this as any).start, (this as any).end];
  }
};
</script>

<style lang="scss">
.el-form-item.v-form-item {
  --el-form-label-font-size: 0.8125rem;
  display: block !important;
  &.is-required:not(.is-no-asterisk) > .el-form-item__label {
    &::before {
      content: '';
    }
    &::after {
      content: '*';
      color: var(--el-color-danger);
      margin-left: 4px;
    }
  }
  .el-form-item__label {
    height: auto;
    line-height: 13px;
    margin-bottom: 0.25rem;
  }
  .el-input__wrapper.is-focus,
  .el-textarea__inner:focus {
    @extend %input-focus;
  }
  &.is-required .el-form-item__label::before {
    display: none;
  }
  &:not(.is-required).v-form-opcional .el-form-item__label {
    @extend %input-opcional;
  }
}
.v-form-opcional .el-form-item.v-form-item:not(.is-required) .el-form-item__label {
  @extend %input-opcional;
}
</style>

<template>
  <div class="box" :class="{ closed: !open }">
    <div class="header" @click="$emit('open')">
      <div class="start">
        <v-icon class="handle" name="drag_handle" />
        <v-ext-display
          v-for="(value, key) in headers"
          :key="key"
          :interface-type="value.interface"
          :options="fields[key].options"
          type="null"
          :name="value.field"
          :value="data[key]"
        ></v-ext-display>
      </div>
      <div class="end">
        <v-icon :name="open ? 'unfold_less' : 'unfold_more'" />
        <button class="delete" @click.stop="$emit('delete')">
          <v-icon name="delete_outline" />
        </button>
      </div>
    </div>
    <div class="container">
      <v-form
        :fields="fields"
        :values="data"
        @stage-value="$emit('stage-value', { id, data: $event })"
      ></v-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    headers: {
      type: Object,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  transition: all var(--fast) var(--transition);
  background-color: var(--input-background-color-alt);
  border-radius: var(--border-radius);
  border: 2px solid var(--input-border-color);
  overflow: hidden;
  margin: 12px 0;

  &:hover {
    border-color: var(--input-border-color-hover);
  }

  &.closed {
    height: calc(var(--input-height) + 4px);

    .header :after {
      display: none;
    }
  }

  .header {
    position: relative;
    height: var(--input-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    :after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 10px;
      width: calc(100% - 20px);
      height: 2px;
      background-color: var(--input-border-color);
      opacity: 0.1;
    }

    .start {
      display: flex;
      align-items: center;
      .handle {
        cursor: pointer;
        color: var(--input-icon-color);
        margin-right: 12px;
        &:hover {
          color: var(--input-text-color);
        }
      }

      .v-ext-display {
        color: var(--page-text-color);
        font-size: var(--input-font-size);
        margin: 10px 10px 10px 0;
      }
    }
    .end {
      i {
        transition: all var(--fast) var(--transition);
        color: var(--input-icon-color);
        &:hover {
          color: var(--input-text-color);
        }
      }
      .delete i:hover {
        color: var(--danger);
      }
    }
  }

  .container {
    padding: 24px 16px 28px;

    .form {
      grid-template-columns:
        [start] minmax(0, var(--form-column-width)) [half] minmax(0, var(--form-column-width))
        [full];
    }
  }
}
</style>

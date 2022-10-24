<template>
  <div
    class="user"
    :class="{
      user__outlined: criticalLimit(user.points),
      user__crown: hasCrown,
    }"
  >
    <p class="user__title">
      {{ user.name }}: {{ user.points }}
    </p>
    <div class="user__adminButtons">
      <div class="user__togglePointsDirection">
        <div
          class="user__togglePointsDirectionItem user__togglePointsDirectionItem_plus"
          :class="{active: plusPointsActive}"
          @click="plusMinus(true)"
        >
          <Icon icon="akar-icons:plus" />
        </div>
        <div
          class="user__togglePointsDirectionItem user__togglePointsDirectionItem_minus"
          :class="{active: !plusPointsActive}"
          @click="plusMinus(false)"
        >
          <Icon icon="akar-icons:minus" />
        </div>
      </div>
      <div class="user__addPoints">
        <input placeholder="Введите баллы" class="input" type="number" v-model="pointsToChange">
        <div class="button button_accept button_ml10" :class="{button_disabled: !isAdmin}" @click="acceptChangePoints()">{{ buttonTitle }}</div>
      </div>
      <div class="user__buttons">
        <div class="user__buttonsAdd">
          <div class="button" :class="{button_disabled: !isAdmin}" @click="addPoints(1, user)">
            <span class="forDesctop">{{ longBuutonTitle }}</span>
            <span class="forMobile">{{ shortButtonTitle }}</span>
            1
          </div>
          <div class="button" :class="{button_disabled: !isAdmin}" @click="addPoints(5, user)">
            <span class="forDesctop">{{ longBuutonTitle }}</span>
            <span class="forMobile">{{ shortButtonTitle }}</span>
            5
          </div>
          <div class="button" :class="{button_disabled: !isAdmin}" @click="addPoints(10, user)">
            <span class="forDesctop">{{ longBuutonTitle }}</span>
            <span class="forMobile">{{ shortButtonTitle }}</span>
            10
          </div>
        </div>
        <div class="user__buttonsDelete">
          <div class="button button_decline" :class="{button_disabled: !isAdmin}" @click="clearUser(user.key)">Очистить</div>
          <div class="button button_decline" :class="{button_disabled: !isAdmin}" @click="removeUser(user.key, index)">Удалить</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useUsersStore from '@/store/usersStore';
import { defineProps, toRefs, ref, computed } from 'vue';
import firebase from 'firebase';
import useBaseStore from '@/store/baseStore';
import { Icon } from '@iconify/vue';

const props = defineProps({
  user: {
    type: Object,
  },
  userIndex: {
    type: Number,
  }, 
});

const { user, userIndex } = toRefs(props);

const baseStore = useBaseStore();

const { isAdmin } = storeToRefs(baseStore);

const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);

const changePoints = ref(true);
const pointsToChange = ref(null);

const buttonTitle = computed(() => {
  return changePoints.value ? 'Добавить' : 'Отнять';
});
const longBuutonTitle = computed(() => {
  return changePoints.value ? 'Добавить' : 'Отнять';
});
const shortButtonTitle = computed(() => {
  return changePoints.value ? '+' : '-';
});

const hasCrown = computed(() => {
  return userIndex.value === 0 && user.value.points > 0;
})

const acceptChangePoints = async () => {
  if(!isAdmin.value || !pointsToChange.value) return;
  const index = userIndex.value;
  users.value[index].points = changePoints.value ?
    users.value[index].points += pointsToChange.value :
    users.value[index].points -= pointsToChange.value;
  baseStore.showLoader();
  await firebase.database().ref('users').child(users.value[index].key).update({points: users.value[index].points});
  pointsToChange.value = null;
  baseStore.hideLoader();
};

const plusPointsActive = computed(() => {
  return changePoints.value === true;
});

const plusMinus = (value) => {
  changePoints.value = value;
}

const criticalLimit = (points) => {
  return points > 10;
};

const addPoints = async (points, user) => {
  if(!isAdmin.value) return;
  baseStore.showLoader();
  changePoints.value ? users.value[userIndex.value].points += points : users.value[userIndex.value].points -= points;
  await firebase.database().ref('users').child(user.key).update({points: users.value[userIndex.value].points});
  baseStore.hideLoader();
};

const clearUser = async (key) => {
  if(!isAdmin.value) return;
  baseStore.showLoader();
  users.value[userIndex.value].points = 0;
  await firebase.database().ref('users').child(key).update({points: 0});
  baseStore.hideLoader();
};
const removeUser = async (key) => {
  if(!isAdmin.value) return;
  baseStore.showLoader();
  await firebase.database().ref('users').child(key).remove();
  usersStore.removeUser(key);
  baseStore.hideLoader();
};
</script>

<style lang="scss" scoped>
  .vue-notification {
    z-index: 100 !important;
  }
  p { 
    margin: 0 0 10px;
  }

.user {
  position: relative;
  border: 3px solid $secondaryBG;
  padding: 10px;
  border-radius: $borderRadius;
  // box-shadow: 0px 0px 19px -4px rgba(74, 78, 105, .75);
  box-shadow: 0px 0px 19px -4px rgba(0, 0, 0, .75);

  & + & {
    margin-top: 30px;
  }

  &__crown::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    right: 5px;
    top: 0;
    // translate: (0 calc(-100% - 3px));
    background-image: $crownIcon;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    // background-color: red;
  }

  &__outlined {
    border-color: $contrastColor;
  }

  &__title {
  }

  &__adminButtons {
  }

  &__togglePointsDirection {
  }

  &__togglePointsDirectionItem {
    position: relative;
    width: 2rem;
    height: 2rem;
    display: inline-grid;
    place-items: center;
    background-color: $secondaryBG;
    border-radius: $borderRadius;
    cursor: pointer;

    svg {
      transition: color .2s;
    }

    &_plus.active svg {
      color: $confirmColor;
    }

    &_minus.active svg {
      color: $declineColor;
    }

    & + & {
      margin-left: 10px;
    }
  }

  &__addPoints {
    margin: 10px 0;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }
}

.forMobile {
  display: none;
}

@media screen and (max-width: 900px) {
  .forDesctop{
    display: none;
  }
  .forMobile {
    display: inline-block;
  }
}

@media screen and (max-width: 550px) {
  .user__buttons {
    display: flex;
    flex-direction: column;
  }

  .user__buttonsDelete {
    margin-top: 10px;
  }
}

@media screen and (max-width: 400px) {
  .user__buttonsAdd {
    display: flex;
    flex-direction: column;

    .button {
      &:not(:nth-child(1)) {
        margin: 10px 0 0;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .user__addPoints {
    .input {
      display: block;
      width: 100%;
    }
    .button {
      margin: 10px 0 0;
    }
  }
}

@media screen and (max-width: 300px) {
  .user__addPoints {
    .button {
      display: block;
      margin-bottom: 20px;
    }
  }
  .user__buttonsDelete {
    .button {
      display: block;

      &:not(:nth-child(1)) {
        margin: 10px 0 0;
      }
    }
  }
}

  // __buttonsAdd
</style>
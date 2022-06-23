import React from 'react';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ru } from 'date-fns/locale'

const Time = ({ date }) => formatDistanceToNow(date, {addSuffix: true, locale: ru})

export default Time;
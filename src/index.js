#! /usr/bin/env node

import * as config from './config/wf-config'
import minimist from 'minimist'
import * as builder from './builder'

import '@babel/polyfill'

const argv = minimist(process.argv) // get all the specified args in the CLI
const options = config.getConfig(argv) // get the setup for the web font generator
/**
 * Generate the icon font
 */
async function build () {
  try {
    const { success, error } = await builder.build(options)
    if (error) {
      console.log('Font failed with error:', error.message)
    } else {
      console.log('Font built with result:', success)
    }
  } catch (err) {
    console.log('Font built failed with error:', err.message)
  }
}

build()

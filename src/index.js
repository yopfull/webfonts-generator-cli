#! /usr/bin/env node
// @flow

import * as WFCconfig from './config/wf-config'
import minimist from 'minimist'
import * as builder from './builder'

import type { Config, Options } from './helper'
import type { BuildResult } from './builder'

import '@babel/polyfill'

const argv: Options = minimist(process.argv) // get all the specified args in the CLI
const config: Config = WFCconfig.getConfig(argv) // get the setup for the web font generator
/**
 * Generate the icon font
 */
async function build () {
  try {
    const result: BuildResult = await builder.build(config)
    if (typeof result !== 'string') {
      const { error, success } = result
      if (error) {
        console.log('Font failed with error:', error.message)
      } else {
        console.log('Font built with result:', success)
      }
    }
  } catch (err) {
    console.log('Font built failed with error:', err.message)
  }
}

build()

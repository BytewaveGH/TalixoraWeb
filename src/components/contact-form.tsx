'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { buttonClasses } from '@/components/ui/button'
import { budgetRanges, developerRoles, enquiryTopics, mailtoLink, site } from '@/content/site'
import { cn } from '@/lib/cn'

type Topic = (typeof enquiryTopics)[number]['value']

/** Map query params (including legacy ones from the old site) to a topic. */
function topicFromParams(params: URLSearchParams | null): Topic {
  const topic = params?.get('topic')
  if (topic && enquiryTopics.some((t) => t.value === topic)) return topic as Topic
  const legacy = (params?.get('category') ?? '').toLowerCase()
  if (legacy.includes('developer')) return 'developer'
  if (legacy.includes('consult')) return 'consultancy'
  if (legacy.includes('real estate')) return 'sellix-real-estate'
  if (legacy.includes('eatery')) return 'sellix-eatery'
  if (legacy.includes('pos')) return 'sellix-pos'
  if (legacy.includes('bidchale')) return 'bidchale'
  if (legacy.includes('project')) return 'project'
  return 'sellix-pos'
}

const field =
  'block w-full rounded-xl border-0 bg-white px-4 py-3 text-ink-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-brand-500'

/**
 * Contact form. Until a backend endpoint is connected, submitting opens the visitor's
 * email client with a pre-filled message addressed to the Talixora inbox.
 */
export function ContactForm() {
  const params = useSearchParams()
  const [topic, setTopic] = useState<Topic>(() => topicFromParams(params))
  const presetRole = params?.get('role') ?? ''
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const topicLabel = enquiryTopics.find((t) => t.value === topic)?.label ?? topic
    const subject = `[${topicLabel}] Enquiry from ${data.get('name')}`
    const lines = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Company: ${data.get('company') || '—'}`,
      `Phone: ${data.get('phone') || '—'}`,
      `Topic: ${topicLabel}`,
    ]
    if (topic === 'developer') lines.push(`Role: ${data.get('role') || '—'}`, `Engagement: ${data.get('engagement') || '—'}`)
    lines.push(`Budget: ${data.get('budget') || '—'}`, '', String(data.get('message') ?? ''))
    window.location.href = mailtoLink(subject, lines.join('\n'))
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center text-center" role="status">
        <CheckCircleIcon className="h-14 w-14 text-mint-500" aria-hidden="true" />
        <h2 className="h-display mt-6 text-2xl">Your email is ready to send</h2>
        <p className="mt-3 max-w-sm text-slate-600">
          We’ve opened your email app with your message filled in. If nothing opened, write to us at{' '}
          <a href={`mailto:${site.email}`} className="font-medium text-brand-600 underline-offset-4 hover:underline">
            {site.email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className={cn(buttonClasses('secondary', 'md'), 'mt-8')}>
          Back to form
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <fieldset>
        <legend className="text-sm font-medium text-ink-900">What can we help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {enquiryTopics.map((t) => (
            <label
              key={t.value}
              className={cn(
                'cursor-pointer rounded-full px-3.5 py-2 text-sm font-medium ring-1 ring-inset transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500',
                topic === t.value
                  ? 'bg-ink-900 text-white ring-ink-900'
                  : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-300',
              )}
            >
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Ama Mensah" />
        </Field>
        <Field label="Work email" htmlFor="email">
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="ama@company.com" />
        </Field>
        <Field label="Company" htmlFor="company" optional>
          <input id="company" name="company" autoComplete="organization" className={field} placeholder="Company name" />
        </Field>
        <Field label="Phone" htmlFor="phone" optional>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="+233 …" />
        </Field>
      </div>

      {topic === 'developer' && (
        <div className="grid gap-5 rounded-2xl bg-brand-50/60 p-5 ring-1 ring-brand-100 sm:grid-cols-2">
          <Field label="Role needed" htmlFor="role">
            <select id="role" name="role" defaultValue={presetRole} className={field}>
              <option value="">Choose a role…</option>
              {developerRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Engagement" htmlFor="engagement">
            <select id="engagement" name="engagement" defaultValue="" className={field}>
              <option value="">Choose…</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Fixed-term project</option>
            </select>
          </Field>
        </div>
      )}

      <Field label="Budget" htmlFor="budget" optional>
        <select id="budget" name="budget" defaultValue="" className={field}>
          <option value="">Select a range…</option>
          {budgetRanges.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(field, 'resize-y')}
          placeholder="Tell us about your business or project — what you use today, what you need, and any timelines."
        />
      </Field>

      <button type="submit" className={buttonClasses('primary', 'lg', 'w-full')}>
        Send message
      </button>
      <p className="text-center text-xs text-slate-500">We reply within one business day. Happy to sign an NDA on request.</p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-medium text-ink-900">
        {label}
        {optional && <span className="text-xs font-normal text-slate-400">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  )
}

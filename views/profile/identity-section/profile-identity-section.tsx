"use client";

import Image from "next/image";
import type { AppLocale } from "@/i18n/config";
import { t } from "@/i18n/t";
import type { ProfileIdentity } from "../profile.types";
import styles from "./profile-identity-section.module.css";

type ProfileIdentitySectionProps = {
  locale: AppLocale;
  identity: ProfileIdentity;
};

export function ProfileIdentitySection({
  locale,
  identity,
}: ProfileIdentitySectionProps) {
  return (
    <section className={styles.identity} aria-labelledby="profile-github-title">
      <h2 id="profile-github-title" className={styles.sectionTitle}>
        {t(locale, "page.profile.github.heading")}
      </h2>
      <div className={styles.identityContent}>
        {identity.image ? (
          <Image
            src={identity.image}
            alt={t(locale, "page.profile.github.avatarAlt", {
              login: identity.githubLogin,
            })}
            width={80}
            height={80}
            unoptimized
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarFallback}>
            {identity.githubLogin.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className={styles.identityText}>
          <p className={styles.identityName}>
            {identity.name ?? identity.githubLogin}
          </p>
          <p className={styles.identityLogin}>@{identity.githubLogin}</p>
          {identity.bio ? <p className={styles.identityBio}>{identity.bio}</p> : null}
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.githubLink}
          >
            {t(locale, "page.profile.github.openLink")}
          </a>
        </div>
      </div>
    </section>
  );
}
